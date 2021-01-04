### Sample Queries

```
 query getUsers {
    users {
      id,
      name,
      patreonEmail,
      patreonPassword,
      patreonLastScrap,
      patreon {
        id,
        patrons,
        perMonth
      }
    }
  }
```

```
query getPatreons {
  patreons {
    id,
    patrons,
    perMonth,
    userId
  }
}
```
