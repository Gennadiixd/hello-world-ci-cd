import Link from "next/link";
import { useMemo } from "react";

export default function OptionCard({ option }) {
  const { title, description, actions, icon, id } = option;

  const actionsSection = useMemo(
    () =>
      actions.map(({ actionPath, actionTitle }) => (
        <button key={id}>
          <Link href={actionPath}>
            <a>{actionTitle}</a>
          </Link>
        </button>
      )),
    []
  );

  return (
    <div className="grid-3 card--container">
      <div className="card">
        <div className="card--title">{title}</div>
        <div className="card--description">{description}</div>
        <div className="card--icon">
          <img src={icon} />
        </div>
        <div className="card--actions">{actionsSection}</div>
      </div>
    </div>
  );
}
