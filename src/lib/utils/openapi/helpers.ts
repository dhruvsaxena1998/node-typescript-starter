import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "@hono/zod-openapi";

type ZodSchema =
  | z.ZodUnion<[z.AnyZodObject, ...z.AnyZodObject[]]>
  | z.AnyZodObject
  | z.ZodArray<z.AnyZodObject>;

function oneOf<T extends ZodSchema>(schemas: T[]) {
  const registry = new OpenAPIRegistry();

  schemas.forEach((schema, index) => {
    registry.register(index.toString(), schema);
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const components = generator.generateComponents();

  return components.components?.schemas
    ? Object.values(components.components!.schemas!)
    : [];
}

export function jsonContent<T extends ZodSchema>(
  schema: T,
  description: string,
) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
}

export function jsonContentRequired<T extends ZodSchema>(
  schema: T,
  description: string,
) {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
}

export function jsonContentOneOf<T extends ZodSchema>(
  schemas: T[],
  description: string,
) {
  return {
    content: {
      "application/json": {
        schema: {
          oneOf: oneOf(schemas),
        },
      },
    },
    description,
  };
}

export function createParamsSchema(key: string, example?: number) {
  return z
    .object({
      [key]: z.coerce.number().positive(),
    })
    .openapi({
      param: {
        name: key,
        in: "path",
      },
      example: {
        [key]: example ?? 1,
      },
    });
}

export function createErrorSchema<T extends ZodSchema>(schema: T) {
  const { error } = schema.safeParse(
    schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray ? [] : {},
  );

  return z.object({
    success: z.boolean().openapi({ example: false }),
    error: z
      .object({
        issues: z.array(
          z.object({
            code: z.string(),
            path: z.array(z.union([z.string(), z.number()])),
            message: z.string().optional(),
          }),
        ),
        name: z.string(),
      })
      .openapi({
        example: error,
      }),
  });
}

export function createSuccessSchema<T extends ZodSchema>(schema: T) {
  const example = schema?._def?.openapi?.metadata?.example;

  return z.object({
    success: z.boolean().openapi({ example: true }),
    data: schema?.openapi({
      example,
    }),
  });
}

export function createNotFoundSchema(example?: string) {
  return z.object({
    success: z.boolean().openapi({ example: false }),
    error: z
      .object({
        issues: z.array(
          z.object({
            message: z.string(),
          }),
        ),
      })
      .openapi({
        example: {
          issues: [{ message: example ?? "" }],
        },
      }),
  });
}
