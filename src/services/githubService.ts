import { GitHubGist, GitHubOrg, GitHubRepo, GitHubUser } from '../types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  etag?: string;
}

// TTL padrão de 30 minutos (em milissegundos)
const DEFAULT_TTL_MS = 30 * 60 * 1000;

// Mapa para deduplicar requisições em voo (in-flight)
const inFlightRequests = new Map<string, Promise<any>>();

/**
 * Busca com cache no localStorage, deduplicação em memória,
 * suporte a ETag (304 Not Modified) e resiliência contra rate limit (403).
 */
export async function cachedFetch<T>(
  url: string,
  options: {
    ttl?: number;
    isText?: boolean;
  } = {}
): Promise<T> {
  const ttl = options.ttl ?? DEFAULT_TTL_MS;
  const storageKey = `gh_cache_${url}`;

  // 1. Verificar cache local no localStorage
  let cachedEntry: CacheEntry<T> | null = null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      cachedEntry = JSON.parse(raw) as CacheEntry<T>;
      const isFresh = Date.now() - cachedEntry.timestamp < ttl;
      if (isFresh) {
        return cachedEntry.data;
      }
    }
  } catch (err) {
    console.warn('Erro ao ler cache do localStorage:', err);
  }

  // 2. Verificar se já existe uma requisição em andamento para a mesma URL (Deduplicação)
  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url)!;
  }

  // 3. Executar a requisição
  const fetchPromise = (async (): Promise<T> => {
    try {
      const headers: Record<string, string> = {
        Accept: options.isText ? 'text/plain' : 'application/vnd.github.v3+json',
      };

      if (cachedEntry?.etag) {
        headers['If-None-Match'] = cachedEntry.etag;
      }

      const response = await fetch(url, { headers });

      // Se não foi modificado (304), renova o timestamp do cache existente
      if (response.status === 304 && cachedEntry) {
        cachedEntry.timestamp = Date.now();
        try {
          localStorage.setItem(storageKey, JSON.stringify(cachedEntry));
        } catch {
          // ignora se localStorage estiver cheio
        }
        return cachedEntry.data;
      }

      // Se bateu no rate limit (403) ou outro erro de servidor, tenta usar o cache existente (mesmo stale)
      if (!response.ok) {
        if (cachedEntry) {
          console.warn(`GitHub API ${response.status} em ${url}. Usando dados em cache.`);
          return cachedEntry.data;
        }
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      const etag = response.headers.get('ETag') || undefined;
      const data: T = options.isText ? ((await response.text()) as unknown as T) : await response.json();

      // Salva no localStorage
      try {
        const entryToSave: CacheEntry<T> = {
          data,
          timestamp: Date.now(),
          etag,
        };
        localStorage.setItem(storageKey, JSON.stringify(entryToSave));
      } catch (err) {
        console.warn('Não foi possível salvar no localStorage:', err);
      }

      return data;
    } catch (err) {
      // Em caso de falha de rede total, retorna dados do cache se disponíveis
      if (cachedEntry) {
        console.warn('Falha de rede ao acessar', url, '. Usando dados do cache anterior.');
        return cachedEntry.data;
      }
      throw err;
    } finally {
      // Remove do mapa de requisições em voo
      inFlightRequests.delete(url);
    }
  })();

  inFlightRequests.set(url, fetchPromise);
  return fetchPromise;
}

// Funções utilitárias especializadas para o app
export async function getGitHubUser(): Promise<GitHubUser> {
  return cachedFetch<GitHubUser>('https://api.github.com/users/thazsobral', {
    ttl: 30 * 60 * 1000, // 30 minutos
  });
}

export async function getGitHubBioText(readmeUrl: string): Promise<string> {
  return cachedFetch<string>(readmeUrl, {
    ttl: 60 * 60 * 1000, // 1 hora para o README
    isText: true,
  });
}

export async function getGitHubGists(): Promise<GitHubGist[]> {
  return cachedFetch<GitHubGist[]>('https://api.github.com/users/thazsobral/gists', {
    ttl: 30 * 60 * 1000,
  });
}

export async function getGitHubGistDetail(gistId: string): Promise<GitHubGist> {
  return cachedFetch<GitHubGist>(`https://api.github.com/gists/${gistId}`, {
    ttl: 60 * 60 * 1000, // 1 hora para o conteúdo de posts/gists
  });
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  return cachedFetch<GitHubRepo[]>('https://api.github.com/users/thazsobral/repos?sort=updated&per_page=100', {
    ttl: 30 * 60 * 1000,
  });
}

export async function getGitHubOrgs(): Promise<GitHubOrg[]> {
  return cachedFetch<GitHubOrg[]>('https://api.github.com/users/thazsobral/orgs', {
    ttl: 60 * 60 * 1000, // 1 hora para organizações
  });
}
