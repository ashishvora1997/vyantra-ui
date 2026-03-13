import React from 'react';

// ── Types ────────────────────────────────────

export type Intent     = 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type Appearance = 'solid' | 'outline' | 'ghost' | 'soft' | 'link';
export type Size       = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Radius     = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ButtonConfig {
  intent:     Intent;
  appearance: Appearance;
  size:       Size;
  radius:     Radius;
  loading:    boolean;
  disabled:   boolean;
  startIcon:  boolean;
  endIcon:    boolean;
  elevated:   boolean;
}

interface ControlsBarProps {
  config: ButtonConfig;
  onChange: (patch: Partial<ButtonConfig>) => void;
}

// ── Chip ─────────────────────────────────────

const Chip: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    className={`ctrl-chip ${active ? 'on' : ''}`}
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
);

// ── Toggle Chip ───────────────────────────────

const ToggleChip: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    className={`ctrl-toggle-chip ${active ? 'on' : ''}`}
    onClick={onClick}
    type="button"
  >
    <span className="ctrl-toggle-chip-dot" />
    {label}
  </button>
);

// ── Controls Bar ─────────────────────────────

export const ControlsBar: React.FC<ControlsBarProps> = ({ config, onChange }) => {
  const intents:     Intent[]     = ['primary','secondary','neutral','success','warning','danger','info'];
  const appearances: Appearance[] = ['solid','outline','ghost','soft','link'];
  const sizes:       Size[]       = ['2xs','xs','sm','md','lg','xl','2xl'];
  const radii:       Radius[]     = ['none','sm','md','lg','xl','full'];

  return (
    <div className="controls-bar">

      {/* Intent */}
      <div className="control-group">
        <span className="control-group-label">Intent</span>
        {intents.map((i) => (
          <Chip key={i} label={i} active={config.intent === i} onClick={() => onChange({ intent: i })} />
        ))}
      </div>

      {/* Appearance */}
      <div className="control-group">
        <span className="control-group-label">Style</span>
        {appearances.map((a) => (
          <Chip key={a} label={a} active={config.appearance === a} onClick={() => onChange({ appearance: a })} />
        ))}
      </div>

      {/* Size */}
      <div className="control-group">
        <span className="control-group-label">Size</span>
        {sizes.map((s) => (
          <Chip key={s} label={s} active={config.size === s} onClick={() => onChange({ size: s })} />
        ))}
      </div>

      {/* Radius */}
      <div className="control-group">
        <span className="control-group-label">Radius</span>
        {radii.map((r) => (
          <Chip key={r} label={r} active={config.radius === r} onClick={() => onChange({ radius: r })} />
        ))}
      </div>

      {/* State toggles */}
      <div className="control-group">
        <span className="control-group-label">State</span>
        <ToggleChip label="loading"   active={config.loading}   onClick={() => onChange({ loading: !config.loading })} />
        <ToggleChip label="disabled"  active={config.disabled}  onClick={() => onChange({ disabled: !config.disabled })} />
        <ToggleChip label="elevated"  active={config.elevated}  onClick={() => onChange({ elevated: !config.elevated })} />
      </div>

      {/* Icon toggles */}
      <div className="control-group">
        <span className="control-group-label">Icons</span>
        <ToggleChip label="startIcon" active={config.startIcon} onClick={() => onChange({ startIcon: !config.startIcon })} />
        <ToggleChip label="endIcon"   active={config.endIcon}   onClick={() => onChange({ endIcon: !config.endIcon })} />
      </div>

    </div>
  );
};