import Link from "next/link";
import { auth, signOut } from "../../auth";

export const NavBar = async () => {
  const session = await auth();

  return (
    <nav className="h-[3rem] border-b">
      <ul className=" flex h-full items-center width-full">
        <li className="ml-8 font-bold">Blog</li>
        <div className="flex gap-x-5 ml-auto mr-8">
          {session ? (
            <>
              <li>Profile</li>
              {session.user && (
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button>Log Out</button>
                </form>
              )}
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>Sing Up</li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};
