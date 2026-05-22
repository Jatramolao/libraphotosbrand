import { useCallback, useState } from 'react';
import { LPProvider } from './context/LPContent';
import { PhotoProvider } from './context/PhotoContext';
import { saveProjectMeta } from './lib/storage';
import ProjectList from './components/ProjectList';
import Gallery from './components/Gallery';
import Editor from './components/Editor';
import BrandSettings from './components/BrandSettings';

export default function App() {
  const [screen, setScreen] = useState('projects');   // 'projects' | 'gallery' | 'editor'
  const [project, setProject] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const [showBrand, setShowBrand] = useState(false);

  const openProject = (p) => { setProject(p); setScreen('gallery'); };
  const openTemplate = (id) => { setTemplateId(id); setScreen('editor'); };

  const handleContentUpdate = useCallback((content) => {
    if (!project) return;
    const updated = { ...project, content, updatedAt: Date.now() };
    setProject(updated);
    saveProjectMeta(updated);
  }, [project]);

  if (screen === 'projects') return <ProjectList onOpen={openProject} />;

  return (
    <LPProvider project={project} onContentUpdate={handleContentUpdate}>
      <PhotoProvider projectId={project.id}>
        {screen === 'gallery' && (
          <Gallery
            project={project}
            onSelectTemplate={openTemplate}
            onBack={() => setScreen('projects')}
            onBrandSettings={() => setShowBrand(true)}
          />
        )}
        {screen === 'editor' && (
          <Editor
            templateId={templateId}
            project={project}
            onBack={() => setScreen('gallery')}
            onBrandSettings={() => setShowBrand(true)}
          />
        )}
        {showBrand && <BrandSettings onClose={() => setShowBrand(false)} />}
      </PhotoProvider>
    </LPProvider>
  );
}
