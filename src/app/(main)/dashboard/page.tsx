import CreateOptions from "./_components/create-options";
import LatestInterviewsList from "./_components/latest-interviews-list";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div>
      <h2 className="py-3 text-2xl font-bold">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}
