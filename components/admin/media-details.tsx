"use client";
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { manageMediaAction } from '@/app/admin/actions';
import type { MediaItem } from './media-library';

export function MediaDetails({ photo, mode, onClose, onSaved, onRemoved }: { photo: MediaItem; mode: 'edit' | 'remove'; onClose: () => void; onSaved: (photo: MediaItem) => void; onRemoved: () => void }) {
  const [name, setName] = useState(photo.name);
  const [alt, setAlt] = useState(photo.alt);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  function submit(event: React.FormEvent) {
    event.preventDefault(); setError('');
    startTransition(async () => {
      try {
        const revision = { id: photo.id, previousName: photo.name, previousAlt: photo.alt };
        const result = await manageMediaAction(mode === 'edit' ? { ...revision, intent: 'edit', name, alt } : { ...revision, intent: 'remove' });
        if (!result.ok) { setError(result.message); return; }
        if (mode === 'edit') onSaved({ ...photo, name: name.trim(), alt: alt.trim() });
        else onRemoved();
      } catch { setError('Could not connect. Your changes are still here; please try again.'); }
    });
  }
  return <Dialog open onOpenChange={open => { if (!open && !pending) onClose(); }}>
    <DialogContent className="admin-root admin-media-details">
      <DialogHeader><DialogTitle>{mode === 'edit' ? 'Edit photograph' : 'Remove photograph?'}</DialogTitle><DialogDescription>{mode === 'edit' ? 'Update the library name and image description. Existing pages keep their saved captions and descriptions.' : 'Remove this photo from the library and image picker. Photos used in drafts or published content must be replaced first. The hosted file is retained in Cloudinary.'}</DialogDescription></DialogHeader>
      <img className="admin-media-details-preview" src={photo.src} alt={photo.alt}/>
      <form onSubmit={submit} className="admin-media-details-form">
        {mode === 'edit' ? <>
          <Label className="admin-field" htmlFor="media-name">Name<Input id="media-name" value={name} onChange={e => setName(e.target.value)} maxLength={160} required disabled={pending}/></Label>
          <Label className="admin-field" htmlFor="media-alt">Image description (alt text)<Textarea id="media-alt" value={alt} onChange={e => setAlt(e.target.value)} minLength={3} maxLength={300} required rows={3} disabled={pending}/></Label>
        </> : <p><strong>{photo.name}</strong></p>}
        {error && <p role="alert" className="admin-notice error">{error}</p>}
        <div className="admin-inline-actions"><Button type="button" className="admin-button" disabled={pending} onClick={onClose}>Cancel</Button><Button type="submit" className={`admin-button ${mode === 'remove' ? 'danger' : 'primary'}`} disabled={pending}>{pending ? 'Saving…' : mode === 'edit' ? 'Save changes' : 'Remove from library'}</Button></div>
      </form>
    </DialogContent>
  </Dialog>;
}
