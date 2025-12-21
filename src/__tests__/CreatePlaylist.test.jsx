import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../context/ThemeContext'
import { MemoryRouter } from 'react-router-dom'

// mock the addPlaylist function BEFORE importing the component that uses it
vi.mock('../services/PlaylistService', () => ({
  __esModule: true,
  addPlaylist: vi.fn()
}))

const mockNavigate = vi.fn()

// partial mock of react-router-dom to intercept navigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const { addPlaylist } = await vi.importMock('../services/PlaylistService')
const CreatePlaylist = (await vi.importActual('../pages/CreatePlaylist')).default

describe('CreatePlaylist form', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // silence alerts
    global.alert = vi.fn()
  })

  afterEach(() => {
    delete global.alert
  })

  it('submits the form, calls addPlaylist and navigates', async () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <CreatePlaylist />
        </ThemeProvider>
      </MemoryRouter>
    )
    const user = userEvent.setup()
    const nameInput = screen.getByPlaceholderText('My Amazing New Playlist')
    const descInput = screen.getByPlaceholderText('A collection of my favorite tunes.')

    await user.type(nameInput, 'My List')
    await user.type(descInput, 'Some description')
    addPlaylist.mockResolvedValue({ id: '1', name: 'My List' })

    // submit the form directly to ensure onSubmit fires in jsdom
    fireEvent.submit(container.querySelector('.create-playlist-form'))

    // The form handler should clear the inputs and trigger user feedback/navigation
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Playlist Created!'))
    expect(mockNavigate).toHaveBeenCalledWith('/playlists')
    expect(nameInput).toHaveValue('')
    expect(descInput).toHaveValue('')
  })
})
