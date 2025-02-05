"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Davanapally Itesh",
    email: "itesh@gitgrant.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "GitGrant",
      logo: GalleryVerticalEnd,
      plan: "open-source",
    },
    {
      name: "Langchain",
      logo: AudioWaveform,
      plan: "open-source",
    },
    {
      name: "AgentKit",
      logo: Command,
      plan: "closed-source",
    },
  ],
  navMain: [
    {
      title: "Maintainer",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/maintainer",
        },
        {
          title: "Repositories",
          url: "/maintainer/repositories",
        },
        {
          title: "Grants",
          url: "/maintainer/grants",
        },
      ],
    },
    {
      title: "Contributor",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Overview",
          url: "/contributor",
        },
        {
          title: "Projects",
          url: "/contributor/projects",
        },
        {
          title: "Earnings",
          url: "/contributor/earnings",
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
