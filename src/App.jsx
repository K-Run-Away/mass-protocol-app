import { useState } from 'react'
import './App.css'
import { Box, Button, Grid, Modal, TextField, Typography, Paper, Divider } from '@mui/material'

const EXERCISES = [
  { key: 'squat', label: 'Squat' },
  { key: 'bench', label: 'Bench Press' },
  { key: 'deadlift', label: 'Deadlift' },
]

// Schedule and session data
const SCHEDULE = [
  // week 1-3
  [
    { type: 'SE', sets: 3, reps: 10, percent: 15 }, // Day 1
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 20, percent: 20 }, // Day 3
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 30, percent: 25 }, // Day 5
    { type: 'E' },
    { type: 'REST' },
  ],
  [
    { type: 'SE', sets: 3, reps: 10, percent: 15 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 20, percent: 20 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 30, percent: 25 },
    { type: 'E' },
    { type: 'REST' },
  ],
  [
    { type: 'SE', sets: 3, reps: 10, percent: 15 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 20, percent: 20 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 30, percent: 25 },
    { type: 'E' },
    { type: 'REST' },
  ],
  // week 4-6
  [
    { type: 'SE', sets: 3, reps: 10, percent: 20 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 20, percent: 25 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 30, percent: 30 },
    { type: 'E' },
    { type: 'REST' },
  ],
  [
    { type: 'SE', sets: 3, reps: 10, percent: 20 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 20, percent: 25 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 30, percent: 30 },
    { type: 'E' },
    { type: 'REST' },
  ],
  [
    { type: 'SE', sets: 3, reps: 10, percent: 20 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 20, percent: 25 },
    { type: 'E' },
    { type: 'SE', sets: 3, reps: 30, percent: 30 },
    { type: 'E' },
    { type: 'REST' },
  ],
]

const DAY_LABELS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']

function calcWeight(oneRM, percent) {
  if (!oneRM) return '-';
  return (Math.round(oneRM * percent) / 100).toFixed(1);
}

function App() {
  const [oneRM, setOneRM] = useState({ squat: '', bench: '', deadlift: '' })
  const [modal, setModal] = useState({ open: false, week: 0, day: 0 })

  const handleInput = (key, value) => {
    setOneRM((prev) => ({ ...prev, [key]: value.replace(/[^0-9.]/g, '') }))
  }

  const openSession = (week, day) => {
    setModal({ open: true, week, day })
  }
  const closeSession = () => setModal({ ...modal, open: false })

  const session = modal.open ? SCHEDULE[modal.week][modal.day] : null

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        Mass Protocol - Base Building
      </Typography>
      <Box sx={{ mb: 4, maxWidth: 600, mx: 'auto', p: 2, bgcolor: '#222', borderRadius: 2 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          Enter your estimated 1RM (kg):
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {EXERCISES.map((ex) => (
            <Grid item xs={12} sm={4} key={ex.key}>
              <TextField
                label={ex.label}
                value={oneRM[ex.key]}
                onChange={e => handleInput(ex.key, e.target.value)}
                type="number"
                fullWidth
                inputProps={{ min: 0 }}
                variant="filled"
                sx={{ bgcolor: '#fff', borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ overflowX: 'auto', mt: 4 }}>
        <Grid container spacing={1} sx={{ minWidth: 1100 }}>
          <Grid item xs={1}>
            <Paper sx={{ p: 1.5, textAlign: 'center', fontWeight: 'bold', fontSize: 18, bgcolor: '#1976d2', color: '#fff' }}>
              Week
            </Paper>
          </Grid>
          {DAY_LABELS.map((d, i) => (
            <Grid item xs={1} key={i}>
              <Paper sx={{ p: 1.5, textAlign: 'center', fontWeight: 'bold', fontSize: 18, bgcolor: '#1976d2', color: '#fff' }}>{d}</Paper>
            </Grid>
          ))}
        </Grid>
        {SCHEDULE.map((week, wIdx) => (
          <Grid container spacing={1} key={wIdx} alignItems="stretch">
            <Grid item xs={1}>
              <Paper sx={{ p: 1.5, textAlign: 'center', fontWeight: 'bold', fontSize: 18, bgcolor: '#1976d2', color: '#fff', height: '100%' }}>{wIdx + 1}</Paper>
            </Grid>
            {week.map((day, dIdx) => (
              <Grid item xs={1} key={dIdx}>
                {day.type === 'REST' ? (
                  <Paper sx={{ p: 2, textAlign: 'center', color: 'gray', height: '100%', fontSize: 18, bgcolor: '#f5f5f5' }}>REST</Paper>
                ) : day.type === 'E' ? (
                  <Paper sx={{ p: 2, textAlign: 'center', color: 'gray', height: '100%', fontSize: 18, bgcolor: '#f5f5f5' }}>E</Paper>
                ) : (
                  <Paper sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: '#e3f2fd',
                    height: '100%',
                    minHeight: 140,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: '2px solid #1976d2',
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {day.sets} x {day.reps}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#1976d2', fontWeight: 'bold' }}>
                      {day.percent}%
                    </Typography>
                    <Divider sx={{ mb: 1 }} />
                    {EXERCISES.map((ex, idx) => (
                      <Box key={ex.key} sx={{ mb: idx < 2 ? 1 : 0 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                          {ex.label}:
                          <span style={{ color: '#1976d2', fontSize: 20, fontWeight: 'bold', marginLeft: 6 }}>
                            {calcWeight(oneRM[ex.key], day.percent)} kg
                          </span>
                        </Typography>
                      </Box>
                    ))}
                  </Paper>
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
      <Modal open={modal.open} onClose={closeSession}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, borderRadius: 2, minWidth: 300 }}>
          {session && session.type === 'SE' ? (
            <>
              <Typography variant="h6" gutterBottom>Session Details</Typography>
              <Typography>Sets x Reps: <b>{session.sets} x {session.reps}</b></Typography>
              <Typography>% of 1RM: <b>{session.percent}%</b></Typography>
              <Box sx={{ mt: 2 }}>
                {EXERCISES.map(ex => (
                  <Typography key={ex.key}>
                    {ex.label}: <b>{calcWeight(oneRM[ex.key], session.percent)} kg</b>
                  </Typography>
                ))}
              </Box>
            </>
          ) : (
            <Typography>This day is not a Strength-Endurance (SE) session.</Typography>
          )}
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button onClick={closeSession} variant="outlined">Close</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default App
