import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ExportPage } from './ExportPage.tsx'
import { ExportPosePage } from './ExportPosePage.tsx'

// Check URL params for export mode
const params = new URLSearchParams(window.location.search);
const isExportMode = params.has('export');
const isPoseExport = params.has('pose');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPoseExport ? <ExportPosePage /> : isExportMode ? <ExportPage /> : <App />}
  </StrictMode>,
)
