'use server'

import { getCurrentUser } from '@/auth'
import { getLocalApi } from '@/lib/get-local-api'
import { ScoreRecord, Team, User } from '@/payload-types'

export async function getLeaderboardCompetitionData(competitionId: string) {
  if (!competitionId) throw new Error('شناسه ماراتن نیاز است')
  const payload = await getLocalApi()

  const competition = await payload.findByID({
    collection: 'competitions',
    id: competitionId,
    select: {
      name: true,
      teams: true,
      endDate: true,
      startDate: true,
      createdAt: true,
      updatedAt: true,
    },
    depth: 1,
  })

  const competitionRecords = await payload.find({
    collection: 'score-records',
    where: {
      competition: {
        equals: competitionId,
      },
    },
    depth: 0,
  })

  const teams = competition.teams as Team[]
  const records = competitionRecords.docs as ScoreRecord[]

  const leaderboard = teams.map((team) => {
    const teamRecords = records
      .filter((record) => record.team === team.id)
      .filter((record) => record.approvalStatus === 'accepted')
    const score = teamRecords.reduce((acc, record) => acc + record.score, 0)
    return { team, score }
  })

  // sort leaderboard by score
  const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score)

  return {
    ...competition,
    tableData: sortedLeaderboard,
  }
}

export async function getRefNotifications(competitionId: string) {
  if (!competitionId) throw new Error('شناسه ماراتن نیاز است')

  const user = await getCurrentUser()

  if (!user) throw new Error('کاربر یافت نشد')

  const payload = await getLocalApi()

  const records = await payload.find({
    collection: 'score-records',
    where: {
      competition: {
        equals: competitionId,
      },
    },
  })

  const competition = await payload.findByID({
    collection: 'competitions',
    id: competitionId,
    select: {
      groups: true,
    },
  })

  const recordsRefHasAccess: ScoreRecord[] = []

  competition.groups.forEach((group) => {
    records.docs.forEach((record) => {
      const ref = group.referee as User
      const groupTeams = group.teams as Team[]
      const groupTeamIds = groupTeams.map((e) => e.id).flat()
      if (groupTeamIds.includes((record.team as Team).id)) {
        if (ref.id === user.id) {
          recordsRefHasAccess.push(record)
        }
      }
    })
  })

  return recordsRefHasAccess
}
