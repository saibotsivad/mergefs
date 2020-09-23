# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

Change categories are:

* `Added` for new features.
* `Changed` for changes in existing functionality.
* `Deprecated` for once-stable features removed in upcoming releases.
* `Removed` for deprecated features removed in this release.
* `Fixed` for any bug fixes.
* `Security` to invite users to upgrade in case of vulnerabilities.

## [1.0.0] - 2020-09-23

### Added
- TypeScript definition file.
- Actual filesystem test, but it doesn't automatically run yet.

### Changed
- Instead of specifying a single file, provide a list of specific
  files to merge.
- Fully drop the CLI, as I don't want the extra bytes downloaded.

## [0.0.0] - 2020-09-20
### Added
- Initialization with basic structure.

[Unreleased]: https://github.com/saibotsivad/mergefs/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/saibotsivad/mergefs/compare/v0.0.0...v1.0.0
[0.0.0]: https://github.com/saibotsivad/mergefs/tree/v0.0.0
