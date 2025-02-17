# Blog

Blog on Next.js + Prism

## Database 

I use Prisma as my ORM and PostgreSQL as my database. 
To start using it, you need to execute this commands.

```
npx prisma generate
npx prisma migrate dev --name init
npm prisma db seed
```

It will automatically create the table and add an admin to it.

## Query

The query route is where the database connection and server actions can be tested.

## Authorization

Authorization is using next-auth@beta which is next-auth version 5.

## Testing

For testing, I use Cypress because Vitest and Jest do not support async Server-Side Components.

To run test run command:

```
pnpm cypress:open
```
