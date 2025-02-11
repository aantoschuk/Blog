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
