import StatusBadge from "./StatusBadge";
import RoleBadge from "./RoleBadge";
import ActionMenu from "./ActionMenu";

function UserRow({ user }) {
  return (
    <tr className="border-t hover:bg-slate-50">

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">

          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full"
          />

          <span className="font-semibold">
            {user.name}
          </span>

        </div>
      </td>

      <td>{user.email}</td>

      <td>
        <RoleBadge role={user.role} />
      </td>

      <td>{user.joined}</td>

      <td>
        <StatusBadge status={user.status} />
      </td>

      <td>
        <ActionMenu />
      </td>

    </tr>
  );
}

export default UserRow;