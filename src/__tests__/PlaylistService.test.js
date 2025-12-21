import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import * as PlaylistService from '../services/PlaylistService'

describe('PlaylistService CRUD', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getAllPlaylists returns data when fetch ok', async () => {
    const fakeData = [{ id: '1', name: 'One' }]
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: async () => fakeData }))

    const res = await PlaylistService.getAllPlaylists()
    expect(res).toEqual(fakeData)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/playlists')
  })

  it('getAllPlaylists throws on non-ok', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false, statusText: 'Not Found' }))
    await expect(PlaylistService.getAllPlaylists()).rejects.toThrow('Error fetching playlists')
  })

  it('addPlaylist posts and returns new playlist', async () => {
    const newPL = { name: 'New', description: 'desc', songs: [] }
    const returned = { ...newPL, id: '123' }
    global.fetch = vi.fn((url, opts) => {
      expect(url).toBe('http://localhost:3001/playlists')
      expect(opts.method).toBe('POST')
      expect(opts.headers['Content-Type']).toBe('application/json')
      expect(JSON.parse(opts.body)).toEqual(newPL)
      return Promise.resolve({ ok: true, json: async () => returned })
    })

    const res = await PlaylistService.addPlaylist(newPL)
    expect(res).toEqual(returned)
  })

  it('updatePlaylist patches and returns updated playlist', async () => {
    const playlistId = 'a1'
    const songs = [{ id: 's1', title: 't1' }]
    const newSong = { id: 's2', title: 't2' }
    const updated = { id: playlistId, songs: [...songs, newSong] }

    global.fetch = vi.fn((url, opts) => {
      expect(url).toBe(`http://localhost:3001/playlists/${playlistId}`)
      expect(opts.method).toBe('PATCH')
      const body = JSON.parse(opts.body)
      expect(body.songs).toEqual([...songs, newSong])
      return Promise.resolve({ ok: true, json: async () => updated })
    })

    const res = await PlaylistService.updatePlaylist(playlistId, newSong, songs)
    expect(res).toEqual(updated)
  })

  it('deletePlaylist calls delete and returns response when ok', async () => {
    const playlistId = 'z9'
    const fakeResponse = { ok: true }
    global.fetch = vi.fn((url, opts) => {
      expect(url).toBe(`http://localhost:3001/playlists/${playlistId}`)
      expect(opts.method).toBe('DELETE')
      return Promise.resolve(fakeResponse)
    })

    const res = await PlaylistService.deletePlaylist(playlistId)
    expect(res).toBe(fakeResponse)
  })
})
