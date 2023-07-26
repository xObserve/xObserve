// Copyright 2023 Datav.io Team
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { VStack } from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { Dashboard } from "types/dashboard";
import DashboardCard from "../dashboard/components/DashboardCard";
import { Team } from "types/teams";

interface Props {
    teams: Team[]
    dashboards: Dashboard[]
    onItemClick?: any
}

const SearchResults = memo(({teams, dashboards,onItemClick }: Props) => {
    return (
        <VStack alignItems="left">
            {
                dashboards.map(dash => <DashboardCard dashboard={dash} owner={teams.find(team => team.id == dash.ownedBy)} onClick={onItemClick}/>)
            }
        </VStack>
    )
})

export default SearchResults;