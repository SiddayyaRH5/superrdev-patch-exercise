# Patch Notes

## Summary of changes

I reviewed the application from the frontend, backend, and SQL sides and focused on issues that could affect correctness, reliability, and user experience.

- Fixed the task search SQL operator-precedence issue in the Spring Data query and the matching H2/Oracle reference SQL. The archived condition, search condition, and selected status are now applied correctly.
- Removed the artificial `Thread.sleep()` delay from the controller because it was unnecessarily blocking the request thread based on the search term.
- Added validation for `page`, `pageSize`, and `status`. Invalid values now return clear HTTP 400 responses. Pagination calculations were also made safer.
- Improved React request handling with cancellation, stale-response protection, proper loading and error cleanup, and clearer API error messages.
- Reset pagination to page 1 when the search or status filter changes.
- Improved the existing UI with clearer filters, result counts, status and priority presentation, loading and error states, empty results, and pagination controls.

## What I chose not to change

I did not add authentication, CRUD features, a new database, or a frontend rewrite. These were outside the current task scope and would make the patch larger without solving the highest-value issues.

I also avoided adding unnecessary debounce delays because request cancellation is enough to prevent stale search results.

## Biggest remaining risk

The application still loads matching records into memory before slicing the requested page. This is fine for the small exercise dataset, but production-scale data should use database-level pagination and a count query.

## Tools / AI used

I used ChatGPT to help inspect the code, understand the SQL and React issues, and suggest possible fixes. I tested the issues myself and checked the changes before applying them. I kept the existing project structure and only made changes that were useful for the assignment.