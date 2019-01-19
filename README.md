# HTML Pageswapper

HTML pageswapper is a website which can be used to automatically swap between
different websites. It can be used e.g. for info terminals.
It can be configured via the `data.json` file and can either be run directly from
the filesystem or on a simple static webserver.

# Technical details

HTML pageswapper uses 2 iframes. One is always shown on the full browser window,
the other one is always hidden. While one iframe is shown the other one already
loads the next page. When the time for the page which is currently shown is over
the iframes are swapped.
Data from the `data.json` file is loaded at every page change and therefore
updates the pages on a regular basis.

# Dependencies

None.
