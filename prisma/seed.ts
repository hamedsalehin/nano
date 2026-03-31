import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create default admin
  const adminPassword = await bcrypt.hash("root", 10)
  
  const admin = await prisma.user.upsert({
    where: { email: "root@admin.local" },
    update: {},
    create: {
      email: "root@admin.local",
      password: adminPassword,
      name: "Administrator",
      role: "ADMIN",
    },
  })

  console.log("Created admin user:", admin.email)

  // Create sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "outdoor-displays" },
      update: {},
      create: {
        name: "Outdoor LED Display",
        slug: "outdoor-displays",
        description: "High brightness LED displays for outdoor applications",
      },
    }),
    prisma.category.upsert({
      where: { slug: "indoor-displays" },
      update: {},
      create: {
        name: "Indoor LED Display",
        slug: "indoor-displays",
        description: "Premium quality LED displays for indoor use",
      },
    }),
    prisma.category.upsert({
      where: { slug: "rental-displays" },
      update: {},
      create: {
        name: "Rental LED Display",
        slug: "rental-displays",
        description: "Flexible rental LED display solutions",
      },
    }),
  ])

  console.log(`Created ${categories.length} categories`)

  // Create sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: "outdoor-p5-led-display" },
      update: {},
      create: {
        name: "Outdoor P5 LED Display",
        slug: "outdoor-p5-led-display",
        description: "Professional outdoor LED display with 5mm pixel pitch",
        price: 5999,
        categoryId: categories[0].id,
        stock: 50,
        specs: {
          brightness: "10000 nits",
          resolution: "1920x1080",
          warranty: "3 years",
        },
      },
    }),
    prisma.product.upsert({
      where: { slug: "indoor-p3-led-display" },
      update: {},
      create: {
        name: "Indoor P3 LED Display",
        slug: "indoor-p3-led-display",
        description: "High resolution indoor LED display with 3mm pixel pitch",
        price: 7999,
        categoryId: categories[1].id,
        stock: 30,
        specs: {
          brightness: "3000 nits",
          resolution: "3840x2160",
          warranty: "3 years",
        },
      },
    }),
    prisma.product.upsert({
      where: { slug: "rental-p4-led-display" },
      update: {},
      create: {
        name: "Rental P4 LED Display",
        slug: "rental-p4-led-display",
        description: "Modular rental LED display system",
        price: 4999,
        categoryId: categories[2].id,
        stock: 100,
        specs: {
          brightness: "5000 nits",
          resolution: "2560x1440",
          warranty: "2 years",
        },
      },
    }),
  ])

  console.log(`Created ${products.length} products`)

  // Initialize site settings with default values
  const settings = [
    { key: "yearsExperience", value: "10" },
    { key: "projectsCompleted", value: "500" },
    { key: "countriesServed", value: "50" },
    { key: "clientSatisfaction", value: "99" },
    { key: "ourProductsTitle", value: "LED Display Solutions" },
    { key: "ourProductsDescription", value: "Premium LED displays for every application" },
    {
      key: "features",
      value: JSON.stringify([
        {
          title: "Ultra High Brightness",
          description: "Up to 10,000 nits for crystal-clear visibility even in direct sunlight.",
        },
        {
          title: "IP65 Waterproof",
          description: "Military-grade protection against water, dust, and extreme weather conditions.",
        },
        {
          title: "3-Year Warranty",
          description: "Full coverage warranty with free replacement parts and technical support.",
        },
        {
          title: "Global Shipping",
          description: "Free worldwide logistics with door-to-door delivery and customs clearance.",
        },
        {
          title: "24/7 Support",
          description: "Round-the-clock technical assistance via phone, email, and live chat.",
        },
        {
          title: "Easy Installation",
          description: "Modular design with tool-free assembly. Professional installation guides included.",
        },
      ]),
    },
  ]

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log("Initialized site settings")
  console.log("\nDatabase seeded successfully!")
  console.log("Default admin login: root / root")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
