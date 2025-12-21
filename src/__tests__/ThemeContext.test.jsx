import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, ThemeContext } from '../context/ThemeContext'
import NavBar from '../components/NavBar'
import { useContext } from 'react'
import { MemoryRouter } from 'react-router-dom'

function DisplayTheme() {
  const { theme } = useContext(ThemeContext)
  return <div>Current: {theme}</div>
}

describe('ThemeContext and NavBar toggle', () => {
  it('toggles theme from light to dark via NavBar button', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <NavBar />
          <DisplayTheme />
        </ThemeProvider>
      </MemoryRouter>
    )

    const user = userEvent.setup()
    expect(screen.getByText(/Current: light/i)).toBeInTheDocument()
    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i })
    await user.click(toggleBtn)
    expect(screen.getByText(/Current: dark/i)).toBeInTheDocument()
  })
})
