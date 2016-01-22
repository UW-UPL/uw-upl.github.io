# Content: Hours

`hours.json` is the list of coord hours

## Hours Object Specification:

```
{
  "<day of the week>": {
    "<start of hour (e.g. '8:50AM')>": "<coord name>"
  }
}
```

Just supply the empty string (`""`) if no coordinator is present at that time.
