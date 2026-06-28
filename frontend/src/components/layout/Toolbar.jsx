import { useState } from 'react';
import {
  Undo2,
  Redo2,
  Save,
  Download,
  Play,
  Settings,
  MoreHorizontal,
  ZapIcon,
} from 'lucide-react';
import { Button, IconButton, Dropdown } from '../ui';
import { cn } from '../../lib/utils';

export default function Toolbar({
  workflowName = 'Untitled Workflow',
  onNameChange,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onSave,
  onExport,
  onRun,
  isDirty = false,
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(workflowName);

  const handleNameSubmit = () => {
    const trimmed = editName.trim();
    if (trimmed) {
      onNameChange?.(trimmed);
    } else {
      setEditName(workflowName);
    }
    setIsEditingName(false);
  };

  const moreItems = [
    {
      id: 'export-json',
      label: 'Export as JSON',
      icon: Download,
      shortcut: '⌘E',
      onClick: () => onExport?.('json'),
    },
    {
      id: 'export-n8n',
      label: 'Export for n8n',
      icon: Download,
      onClick: () => onExport?.('n8n'),
    },
    { separator: true },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      onClick: () => {},
    },
  ];

  return (
    <header
      className="
        flex items-center gap-2 px-4 py-1.5
        bg-background border-b border-border z-20 shadow-sm
      "
      role="toolbar"
      aria-label="Workflow toolbar"
    >
      <div className="flex items-center gap-2 mr-2">
        <div className="w-6 h-6 rounded flex items-center justify-center text-primary bg-primary/10">
          <ZapIcon size={14} className="fill-current" />
        </div>

        {isEditingName ? (
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNameSubmit();
              if (e.key === 'Escape') {
                setEditName(workflowName);
                setIsEditingName(false);
              }
            }}
            className="text-sm font-medium bg-background border border-primary text-foreground outline-none px-1.5 py-0.5 rounded-sm w-48 shadow-sm focus:ring-1 focus:ring-ring"
            autoFocus
          />
        ) : (
          <button
            onClick={() => {
              setEditName(workflowName);
              setIsEditingName(true);
            }}
            className="text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground px-1.5 py-0.5 rounded-sm transition-colors cursor-pointer truncate max-w-[200px]"
            title="Click to rename"
          >
            {workflowName}
          </button>
        )}

        {isDirty && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#dcdcaa] shadow-[0_0_8px_rgba(220,220,170,0.5)]" title="Unsaved changes" />
        )}
      </div>

      <div className="h-5 w-px bg-border mx-1" role="separator" />

      <div className="flex items-center gap-0.5">
        <IconButton
          icon={Undo2}
          size="sm"
          tooltip="Undo (Ctrl+Z)"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Undo"
        />
        <IconButton
          icon={Redo2}
          size="sm"
          tooltip="Redo (Ctrl+Shift+Z)"
          onClick={onRedo}
          disabled={!canRedo}
          aria-label="Redo"
        />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5">
        <Button
          variant="secondary"
          size="sm"
          icon={Save}
          onClick={onSave}
          className="h-7 text-xs px-3"
        >
          Save
        </Button>

        <Button
          variant="primary"
          size="sm"
          icon={Play}
          onClick={onRun}
          className="h-7 text-xs px-3"
        >
          Run
        </Button>

        <Dropdown
          trigger={
            <IconButton
              icon={MoreHorizontal}
              size="sm"
              tooltip="More actions"
              aria-label="More actions"
            />
          }
          items={moreItems}
          align="right"
        />
      </div>
    </header>
  );
}
