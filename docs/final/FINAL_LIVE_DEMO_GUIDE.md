# Final live demo guide
> Final document. LayerProof public website, final release of 2026-10-07. Later changes are ordinary content or product updates.

## Status: HOSTING REQUIRED
The read-only demo is packaged, seeded with real data and tested locally. It has not been deployed to a public host,
because no hosting account or domain was available. No public address exists. The website shows no demo link until
`DEMO_URL` is set.

## Components at a glance
| Component | What | Where |
|---|---|---|
| Frontend | accepted frontend built with `VITE_AUTH_MODE=demo`, served by nginx with rate limits | `infra/demo/Dockerfile.web`, `infra/demo/nginx/` |
| API | accepted backend image in read-only mode (`LP_PUBLIC_DEMO`); every non-read request is refused by an HTTP gate | `backend/Dockerfile` |
| Worker | queue worker; idle in the demo because nothing can enqueue work | `backend/Dockerfile` |
| PostgreSQL / PostGIS | PostgreSQL 16 with PostGIS | `infra/demo/docker-compose.demo.yml`, `infra/demo/postgres/` |
| Migrations | Alembic, head `0010_week8_retro_pilot`, run by the one-shot `seed` service | `backend/migrations/` |
| Seed data | real SPARC and MnDOT files imported through the normal pipeline; the seed fails unless it reproduces `infra/demo/expected_results.json` | `scripts/demo/seed_demo.py` |
| Public-demo role | `lp_demo`, SELECT only, read-only transactions by default | `scripts/demo/grant_demo_role.py` |
| CORS | `LP_CORS_ORIGINS`, needed only when the frontend and API are on different origins | API settings |
| Health / readiness | `GET /health` (liveness); `GET /ready` (database reachable and visitor seeded; 503 otherwise) | nginx, API |
| Reset | delete the database and object volume and run the seed again; locally `scripts/demo/local_demo.sh reset` | — |
| Security | no sign-up, no upload, no write path, no administration, no logs; secrets supplied by the host, none built into an image | ADR-033 |
| Rollback | redeploy the previous image tags and reset; the database holds nothing that cannot be re-seeded | — |

Docker images were validated with `docker compose config` only; they have not been built on a Docker host.

The External evidence page of the demo, including the NCHRP 933 / MnROAD panel, is compiled into the frontend and
needs nothing from the database.

The full deployment procedure (environment variables, start-up order, verification, reset) is kept with the
application, in `docs/public/final_website/FINAL_LIVE_DEMO_GUIDE.md` of the private application repository.
