# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][Keep a Changelog] and this project adheres to [Semantic Versioning][Semantic Versioning].

## [Unreleased]

## Added

- option to insert video link into markdown output

## Fixed

- mobile keyboard enter handling

---

## [0.1.3] - 2021-09-13

Added new features and fixed some bugs.

### Added

- option to change video playback speed
- option to edit and delete individual notes
- button to start taking notes again from the note view
- about page
- export options in formats: txt, json, md
- code cleanup and documentation comments

### Changed

- how the notes are displayed

### Fixed

- added 2 newlines at the end of the note in export, so there is newline between them
- added trimming of the notes, so no redundant newline at the end and output will be consistent

### Removed

- unused buttons to change quality (not supported by youtube api) and show controls and commands, used about page instead

---

## [0.1.2] - 2021-09-11

Added new features and changed some behavior. Also changed the format of saved notes. No migration support available from the old one to the new one.

New format:

```JSON
{
    "id": "video-id",
    "title": "video-title",
    "notes": {
        "timestamp": "note text"
    }
}
```

### Added

- Styling with bootstrap
- Clicking on timestamp seeks video to given time, change cursor on hover to pointer
- Editing of notes on notetaking page
- Notes deletion
- Save command (s)
- Multiline note support (Shift+Enter)
- Left/Right arrow to seek in video

### Changed

- Unified width of all elements
- Better URL param parsing
- Safer element generation in list view
- Load existing notes if available
- Format of saved notes (contain id, title, and object of notes, where keys are positions in video in seconds)

### Deprecated

- Old format of saved notes (just an object of notes without any other metadata)

## [0.1.1] - 2020-05-01

### Fixed

- wrong version in changelog file

## [0.1.0] - 2020-05-01

Initial version

### Added

- Basic functionality for note taking
- Exporting notes in json format
- Saving notes in browser local storage

---

<!-- Links -->
[Keep a Changelog]: https://keepachangelog.com/
[Semantic Versioning]: https://semver.org/

<!-- Versions -->
[Unreleased]: https://github.com/makovako/youtube-time-notes/compare/v0.1.3...HEAD
[Released]: https://github.com/makovako/youtube-time-notes/releases
[0.1.3]: https://github.com/makovako/youtube-time-notes/releases/v0.1.3
[0.1.2]: https://github.com/makovako/youtube-time-notes/releases/v0.1.2
[0.1.1]: https://github.com/makovako/youtube-time-notes/releases/v0.1.1
[0.1.0]: https://github.com/makovako/youtube-time-notes/releases/v0.1.0
