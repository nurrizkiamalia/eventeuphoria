import Link from "next/link";
import ButtonDashboard from "@/components/Button/ButtonDashboard";

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
    <div className="h-full flex flex-col justify-between">
      <ul className="flex flex-col gap-3">
        {navList.map((item, index) => (
          <li key={index} className="text-sm font-medium text-gray-700 hover:text-purple-600">
            <Link href={item.links}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <ButtonDashboard className="">
        <Link href="/create-event">Create Event</Link>
      </ButtonDashboard>
    </div>
  );
};

export default SideNavList;
