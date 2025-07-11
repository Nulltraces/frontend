# Translating Errors

To handle an API error, use the hook:

```typescript
import { useError } from "@uwucord/i18n";

const err = useError();

<span>{err(someErrorObject)}</span>;
```
