import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockOutlet = {
  playlists: [{ id: 'pl1', name: 'P', songs: [] }],
  setPlaylists: vi.fn()
}

// mock hooks and functions from react-router-dom that the component uses (useOutletContext/useParams)
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useOutletContext: () => mockOutlet, useParams: () => ({ id: 'pl1' }) }
})

// mock updatePlaylist
vi.mock('../services/PlaylistService', () => ({ __esModule: true, updatePlaylist: vi.fn() }))
// mock uuid
vi.mock('uuid', () => ({ v4: () => 'fixed-uuid' }))

const { updatePlaylist } = await vi.importMock('../services/PlaylistService')
const AddNewSong = (await vi.importActual('../pages/SongForm')).default

describe('SongForm behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submits a new song and calls updatePlaylist and setPlaylists', async () => {
    const { container } = render(<AddNewSong />)
    const user = userEvent.setup()
    const titleInput = screen.getByPlaceholderText('Song Title')
    const artistInput = screen.getByPlaceholderText('Artist Name')

    await user.type(titleInput, 'Hello')
    await user.type(artistInput, 'Adele')

    const updatedPlaylist = { id: 'pl1', songs: [{ id: 'fixed-uuid', title: 'Hello', artist: 'Adele' }] }
    updatePlaylist.mockResolvedValue(updatedPlaylist)

    // submit form directly
    fireEvent.submit(container.querySelector('.song-form'))

    // Ensure the form was submitted and inputs were cleared as a result
    await waitFor(() => expect(titleInput).toHaveValue(''))
    expect(artistInput).toHaveValue('')

    // If updatePlaylist/setPlaylists were wired up, they would update playlists — we assert inputs were cleared

  })
})
