This is a test project that I'm using to understand semantic versioning.

## Semantic Versioning (Semver) Setup

This project uses **semantic-release** for automated semantic versioning.

### What is Semver?

Semantic versioning follows the format `MAJOR.MINOR.PATCH` (e.g., `1.9.0`):
- **MAJOR** (1.x.x): Breaking changes that are incompatible with previous versions
- **MINOR** (1.x.0): New features that are backward-compatible
- **PATCH** (1.9.x): Bug fixes that are backward-compatible

### Current Version

- **Current version**: `1.9.0` (in `package.json`)

### Configuration

Configured via `.releaserc.json`:

1. **Release branches**: `main` and `master`

2. **Plugins** (in order):
   - **`@semantic-release/commit-analyzer`**: Analyzes commits to determine version bumps (major/minor/patch)
   - **`@semantic-release/release-notes-generator`**: Generates release notes from commits
   - **`@semantic-release/changelog`**: Updates `CHANGELOG.md` with release notes
   - **`@semantic-release/npm`**: Updates `package.json` version (with `npmPublish: false` — doesn't publish to npm)
   - **`@semantic-release/git`**: Commits version changes to `package.json` and `CHANGELOG.md` with a skip-ci message
   - **`@semantic-release/github`**: Creates GitHub releases

### How It Works

1. Analyzes commit messages (Conventional Commits)
2. Determines the next version (major/minor/patch)
3. Updates `CHANGELOG.md` and `package.json`
4. Creates a git tag
5. Creates a GitHub release

### Usage

Run:
```bash
npm run release
```

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` - New feature → **MINOR** version bump
- `fix:` - Bug fix → **PATCH** version bump
- `feat!:` or `BREAKING CHANGE:` - Breaking change → **MAJOR** version bump
- `docs:`, `style:`, `refactor:`, `test:`, `chore:` - No version bump (unless breaking)

### Evidence of Automation

`CHANGELOG.md` shows automated releases from `1.0.0` to `1.9.0`, with features, bug fixes, and links to commits and PRs.

This setup automates versioning based on commit messages, so you don't need to manually bump versions.
