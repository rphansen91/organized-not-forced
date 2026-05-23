import { useState } from 'react';
import { VitruvianDiagram, Figure, BookCover, allPoses } from '@onf/ui';
import type { PoseDefinition } from '@onf/ui';
import { Vitruvian3D } from './components/Vitruvian3D';
import './App.css';

function PoseCard({ pose, isSelected, onClick }: { 
  pose: PoseDefinition; 
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div 
      className={`pose-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <VitruvianDiagram 
        size={120} 
        figureOpacity={0.5}
        showRadialLines={false}
      >
        <Figure 
          joints={pose.joints} 
          ghostJoints={pose.ghostJoints}
          showAnatomy={false}
        />
      </VitruvianDiagram>
      <div className="pose-info">
        <h3>{pose.name}</h3>
        {pose.chapter && <span className="chapter-tag">Ch. {pose.chapter}</span>}
      </div>
    </div>
  );
}

function App() {
  // Default to Pistol Squat (Left) for cover
  const pistolSquatLeft = allPoses.find(p => p.name === 'Pistol Squat (Left)') || allPoses[0];
  const [selectedPose, setSelectedPose] = useState<PoseDefinition>(pistolSquatLeft);
  const [showCircles, setShowCircles] = useState(true);
  const [showSquares, setShowSquares] = useState(true);
  const [showRadialLines, setShowRadialLines] = useState(true);
  const [showSpiral, setShowSpiral] = useState(false);
  const [showAnatomy, setShowAnatomy] = useState(true);
  const [figureOpacity, setFigureOpacity] = useState(0.7);
  const [autoRotate, setAutoRotate] = useState(false);
  const [animateGeometry, setAnimateGeometry] = useState(true);
  const [circleCount, setCircleCount] = useState(5);
  const [squareCount, setSquareCount] = useState(2);
  const [radialLineCount, setRadialLineCount] = useState(8);
  const [viewMode, setViewMode] = useState<'diagram' | 'cover' | '3d'>('3d');

  return (
    <div className="app">
      <header className="header">
        <h1>Organized, Not Forced</h1>
        <p className="subtitle">Movement Lessons from Bodyweight Training</p>
      </header>

      <main className="main">
        <section className="diagram-section">
          {/* View Mode Toggle */}
          <div className="view-toggle">
            <button 
              className={viewMode === '3d' ? 'active' : ''} 
              onClick={() => setViewMode('3d')}
            >
              3D View
            </button>
            <button 
              className={viewMode === 'diagram' ? 'active' : ''} 
              onClick={() => setViewMode('diagram')}
            >
              Diagram
            </button>
            <button 
              className={viewMode === 'cover' ? 'active' : ''} 
              onClick={() => setViewMode('cover')}
            >
              Cover Preview
            </button>
          </div>

          <div className="diagram-container">
            {viewMode === '3d' ? (
              <Vitruvian3D
                joints={selectedPose.joints}
                ghostJoints={selectedPose.ghostJoints}
                size={450}
                showCircles={showCircles}
                showSquares={showSquares}
                showRadialLines={showRadialLines}
                showSpiral={showSpiral}
                showAnatomy={showAnatomy}
                autoRotate={autoRotate}
                animateGeometry={animateGeometry}
                circleCount={circleCount}
                squareCount={squareCount}
                radialLineCount={radialLineCount}
                cameraPosition={
                  selectedPose.name.toLowerCase().includes('planche') ||
                  selectedPose.name.toLowerCase().includes('lever')
                    ? [3.5, 0, 0]  // Side view for horizontal poses
                    : [0, 0, 3.5] // Front view for everything else
                }
              />
            ) : viewMode === 'cover' ? (
              <BookCover
                pose={selectedPose.joints}
                width={400}
                height={600}
                author="Ryan P. Hansen"
                showCircles={showCircles}
                showSquares={showSquares}
                showRadialLines={showRadialLines}
                showSpiral={showSpiral}
                showAnatomy={showAnatomy}
                figureOpacity={figureOpacity}
              />
            ) : (
              <VitruvianDiagram
                size={400}
                figureOpacity={figureOpacity}
                showCircles={showCircles}
                showSquares={showSquares}
                showRadialLines={showRadialLines}
                showSpiral={showSpiral}
              >
                <Figure
                  joints={selectedPose.joints}
                  ghostJoints={selectedPose.ghostJoints}
                  showAnatomy={showAnatomy}
                />
              </VitruvianDiagram>
            )}
          </div>

          <div className="pose-details">
            <h2>{selectedPose.name}</h2>
            <p>{selectedPose.description}</p>
            {selectedPose.chapter && (
              <p className="chapter-ref">Featured in Chapter {selectedPose.chapter}</p>
            )}
          </div>

          <div className="controls">
            <h3>Display Options</h3>
            <label className="control-row">
              <input
                type="checkbox"
                checked={showCircles}
                onChange={(e) => setShowCircles(e.target.checked)}
              />
              <span>Circles</span>
              {viewMode === '3d' && showCircles && (
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={circleCount}
                  onChange={(e) => setCircleCount(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
                  className="count-input"
                />
              )}
            </label>
            <label className="control-row">
              <input
                type="checkbox"
                checked={showSquares}
                onChange={(e) => setShowSquares(e.target.checked)}
              />
              <span>Squares</span>
              {viewMode === '3d' && showSquares && (
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={squareCount}
                  onChange={(e) => setSquareCount(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                  className="count-input"
                />
              )}
            </label>
            <label className="control-row">
              <input
                type="checkbox"
                checked={showRadialLines}
                onChange={(e) => setShowRadialLines(e.target.checked)}
              />
              <span>Radial Lines</span>
              {viewMode === '3d' && showRadialLines && (
                <input
                  type="number"
                  min="2"
                  max="16"
                  value={radialLineCount}
                  onChange={(e) => setRadialLineCount(Math.max(2, Math.min(16, parseInt(e.target.value) || 2)))}
                  className="count-input"
                />
              )}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showSpiral}
                onChange={(e) => setShowSpiral(e.target.checked)}
              />
              Golden Spiral
            </label>
            <label>
              <input
                type="checkbox"
                checked={showAnatomy}
                onChange={(e) => setShowAnatomy(e.target.checked)}
              />
              Anatomical Details
            </label>
            {viewMode === '3d' && (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={animateGeometry}
                    onChange={(e) => setAnimateGeometry(e.target.checked)}
                  />
                  Animate Geometry (Fibonacci)
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={autoRotate}
                    onChange={(e) => setAutoRotate(e.target.checked)}
                  />
                  Rotate Camera
                </label>
              </>
            )}
            <label>
              Figure Opacity: {Math.round(figureOpacity * 100)}%
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.05"
                value={figureOpacity}
                onChange={(e) => setFigureOpacity(parseFloat(e.target.value))}
              />
            </label>
          </div>
        </section>

        <section className="poses-section">
          <h2>Skill Poses</h2>
          <div className="poses-grid">
            {allPoses.map((pose) => (
              <PoseCard
                key={pose.name}
                pose={pose}
                isSelected={pose.name === selectedPose.name}
                onClick={() => setSelectedPose(pose)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
