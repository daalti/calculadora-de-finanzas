// 'use client';

import {
  RiDriveFill,
  RiDropboxFill,
  RiFacebookFill,
  RiNotionFill,
  RiSlackFill,
} from "@remixicon/react";
import { Card } from "../tremor/Card";

const data = [
  {
    name: "Google Drive",
    description: "Automate your file upload workflow",
    icon: RiDriveFill,
    status: "Connected",
  },
  {
    name: "Facebook Ads",
    description: "Analayze ad performance directly in your workspace",
    icon: RiFacebookFill,
    status: "Enable",
  },
  {
    name: "Notion",
    description: "Create, manage and sync documentation",
    icon: RiNotionFill,
    status: "Enable",
  },
  {
    name: "Slack",
    description: "Sent alerts and workspace updates to your slack account",
    icon: RiSlackFill,
    status: "Connected",
  },
  {
    name: "Dropbox",
    description: "Automate your file upload workflow",
    icon: RiDropboxFill,
    status: "Enable",
  },
];

export const GridList = () => {
  return (
    <div style={{ maxWidth: "1000px" }}>
      <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <Card key={item.name} className="flex flex-col justify-between">
            <item.icon className="size-6 shrink-0" aria-hidden={true} />
            <div className="mt-6 flex-1">
              <dt className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.name}
              </dt>
              <dd className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                {item.description}
              </dd>
            </div>
            <button
              type="button"
              className="mt-8 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand py-2 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-tremor-brand dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis disabled:hover:dark:bg-dark-tremor-brand"
              disabled={item.status === "Connected" ? true : false}
            >
              {item.status}
            </button>
          </Card>
        ))}
      </dl>
    </div>
  );
};
