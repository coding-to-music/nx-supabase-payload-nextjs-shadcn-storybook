# nx-supabase-payload-nextjs-shadcn-storybook

# 🚀 Nx Supabase Payload CMS Next.js shadcn/ui Storybook monorepo deno 🚀

https://github.com/coding-to-music/nx-supabase-payload-nextjs-shadcn-storybook

From / By https://github.com/DanielGiljam/nx-supabase-payload-nextjs-shadcn-storybook-monorepo

https://nx-supabase-payload-nextjs-shadcn-storybook-monorepo.vercel.app/

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/nx-supabase-payload-nextjs-shadcn-storybook.git
git push -u origin main
```

## Environment variables:

```java

```

# Nx Supabase Payload CMS Next.js shadcn/ui Storybook monorepo

A template monorepo for a stack with

- [Nx](https://nx.dev)
- [Supabase](https://supabase.com/)
- [Payload CMS](https://payloadcms.com/)
- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Storybook](https://storybook.js.org/)

## Local development

Ensure you have Node.js v20.9 or newer installed and [Corepack enabled](https://nodejs.org/api/corepack.html#enabling-the-feature) + Docker installed.

1. Install dependencies.

    ```sh
    pnpm install
    ```

1. Start [local Supabase stack](https://supabase.com/docs/guides/local-development).

    ```sh
    pnpm supabase start
    ```

1. Navigate to the buckets page in the local Supabase Studio (`http://127.0.0.1:54323/project/default/storage/buckets`) and create a new bucket named `payload` with default settings.

1. Copy `.env.local-example` as `.env.local` and fill in

    - `S3_ACCESS_KEY_ID`
    - `S3_SECRET_ACCESS_KEY`
    - `SUPABASE_JWT_SECRET`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

    based on values printed by `pnpm supabase status`, and

    - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

    with your [Google OAuth 2.0 client ID](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid) (for Sign in with Google).

1. Start [Next.js dev server](https://nextjs.org/docs/app/getting-started/installation#run-the-development-server).

    ```sh
    pnpm nx dev nextjs-app
    ```

1. Navigate to `http://localhost:3000/admin` with your web browser and follow the instructions on screen to create a local test admin user.

### Convenience scripts

<!-- prettier-ignore -->
|Script|Description|Simple equivalent|
|-|-|-|
|`pnpm typecheck`|Type-check with TypeScript|`tsc --noEmit`|
|`pnpm lint`|Lint with ESLint|`eslint .`|
|`pnpm fix`|Fix auto-fixable problems with ESLint|`eslint --fix .`|
|`pnpm prettier`|Check formatting with Prettier|`prettier .`|
|`pnpm format`|Format with Prettier|`prettier --write .`|
|`pnpm lp`|Lint and check formatting|`pnpm lint; pnpm prettier`|
|`pnpm tlp`|Type-check, lint and run Prettier (check formatting)|`pnpm typecheck; pnpm lint; pnpm prettier`|
|`pnpm ff`|Fix and format|`pnpm fix; pnpm format`|
|`pnpm tff`|Type-check, fix and format|`pnpm typecheck; pnpm fix; pnpm format`|

#### Why use convenience scripts over simple equivalents?

- Tasks are run through Nx which enables

    - parallelization
    - advanced caching
    - only running the tasks on affected code

    which makes running the scripts much faster

- The "combo" / "chained" scripts (`lp`, `tlp`, `ff`, `tff`) forward arguments to each subtask

    - see `scripts/{typecheck-,}{lint-and-prettier,fix-and-format}.bash`

#### Examples

- Type-check, fix and format projects affected by uncommitted and untracked changes

    ```
    pnpm tff
    ```

- Type-check, fix and format all projects

    ```
    pnpm tff:all
    ```

- Lint and check formatting for projects affected by committed, uncommitted and untracked changes compared to `origin/main`

    ```
    pnpm lp --base=origin/main
    ```

- Type-check projects affected by committed changes when comparing `origin/main` to `HEAD`

    ```
    pnpm typecheck --base=origin/main --head=HEAD
    ```

For more information about available arguments see [`nx affected` documentation](https://nx.dev/nx-api/nx/documents/affected).
