# Nitro OpenAPI Upload

A GitHub Action that uploads OpenAPI documents to the Nitro registry.

## Usage

```yaml
- uses: ChilliCream/nitro-openapi-upload@v16
  with:
    tag: <tag>
    openapi-collection-id: <openapi-collection-id>
    api-key: <api-key>
    patterns:
      - ./endpoints/**/*.graphql
      - ./models/Person.graphql
    # Optional
    cloud-url: <cloud-url>
```

## Inputs

| Name                    | Required | Description                                        |
| ----------------------- | -------- | -------------------------------------------------- |
| `tag`                   | Yes      | The tag of the OpenAPI collection version          |
| `openapi-collection-id` | Yes      | The ID of the OpenAPI collection                   |
| `api-key`               | Yes      | API key for authentication                         |
| `patterns`              | Yes      | Glob patterns for selecting OpenAPI document files |
| `cloud-url`             | No       | The URL of the Nitro registry                      |

If you self-host Nitro or use a dedicated hosted instance, you can specify the `cloud-url` input to point to your instance.
