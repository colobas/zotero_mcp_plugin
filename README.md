# Zotero MCP Bridge

Zotero MCP Bridge is a Zotero 7 plugin that will expose a local [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server so LLM clients can browse and query your Zotero library with tool calls. The plugin is written in TypeScript and will integrate the [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) for the MCP implementation.

This repository started from the canonical Zotero plugin template, but the template-only samples and UI chrome have been removed so we can focus on the MCP bridge code.

## Project Goals

- Ship a local MCP server that runs inside Zotero and surfaces Zotero-specific tools such as listing open tabs, searching items, and browsing collections.
- Provide a lightweight communication shim so LLMs can attach to the running Zotero MCP server.
- Keep the UI surface minimal—most interaction should happen through MCP tool calls rather than extra Zotero menus.

## Repository Layout

- `src/` – TypeScript source for the plugin, including the MCP runtime scaffolding.
- `addon/` – Static assets packaged with the XPI (manifest, icons, locale strings).
- `test/` – Mocha test suite executed via `npm test`.
- `zotero-plugin.config.ts` – Build configuration for `zotero-plugin-scaffold`.

## Getting Started

```bash
npm install
npm run build   # bundles the plugin and runs `tsc --noEmit`
```

During development you can hot-reload the plugin into Zotero with:

```bash
npm run start
```

Run tests in a scaffolded Zotero instance with:

```bash
npm test
```

> **Note:** the build pipeline expects Zotero 7 and the latest Node.js LTS release. See the [official developer guide](https://www.zotero.org/support/dev/zotero_7_for_developers) for environment prerequisites.

## Contributing

- Track work with `bd` (see `AGENTS.md`).
- Keep code TypeScript-first with strict linting (`npm run lint:check`).
- Commit code and `.beads/issues.jsonl` together so issue state mirrors code state.
