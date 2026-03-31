// Database stub - Replace with Prisma when npm dependencies are installed
// This placeholder prevents import errors during development

export const prisma = {
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => data,
    update: async (data: any) => data,
    delete: async () => null,
  },
  product: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async (data: any) => data,
    update: async (data: any) => data,
    delete: async () => null,
  },
  cart: {
    findMany: async () => [],
    create: async (data: any) => data,
    update: async (data: any) => data,
    delete: async () => null,
  },
  order: {
    create: async (data: any) => data,
    findMany: async () => [],
    findUnique: async () => null,
    update: async (data: any) => data,
  },
  ticket: {
    create: async (data: any) => data,
    findMany: async () => [],
    findUnique: async () => null,
    update: async (data: any) => data,
  },
} as any
