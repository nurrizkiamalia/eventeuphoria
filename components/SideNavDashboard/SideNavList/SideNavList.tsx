import ButtonDashboard from "@/components/Button/ButtonDashboard";
import Link from "next/link";

interface NavList {
  links: string;
  name: string;
}

const navList: NavList[] = [
  { links: "/dashboard", name: "Dashboard" },
  { links: "/dashboard/my-event", name: "My Event" },
  { links: "/dashboard/transaction", name: "Transaction" },
];

const SideNavList: React.FC = () => {
  return (
    <>
      <ul className="flex flex-col gap-5">
        {navList.map((item, index) => (
          <li
            key={index}
            className="hover:scale-105 transition-all duration-300 hover:text-purple-200"
          >
            <Link href={item.links}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <ButtonDashboard className=""><Link href="/create-event">Create Event</Link></ButtonDashboard>
    </>
  );
};

export default SideNavList;
