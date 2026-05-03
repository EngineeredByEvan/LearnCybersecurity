import { FSNode } from './types';

export const createDefaultFS = (): FSNode => ({
  type: 'dir',
  children: {
    home: { type: 'dir', children: { learner: { type: 'dir', children: { 'notes.txt': { type: 'file', content: 'SOC prep notes' } } } } },
    etc: { type: 'dir', children: { passwd: { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash' } } },
    var: { type: 'dir', children: { log: { type: 'dir', children: { 'auth.log': { type: 'file', content: 'May 3 sshd: Accepted publickey for learner' } } } } }
  }
});

export const normalizePath = (cwd: string, path?: string): string => {
  const base = path?.startsWith('/') ? path : `${cwd}/${path ?? ''}`;
  const parts = base.split('/').filter(Boolean);
  const stack: string[] = [];
  for (const p of parts) {
    if (p === '.') continue;
    if (p === '..') stack.pop(); else stack.push(p);
  }
  return '/' + stack.join('/');
};

export const getNode = (root: FSNode, path: string): FSNode | undefined => {
  if (path === '/') return root;
  const parts = path.split('/').filter(Boolean);
  let current: FSNode = root;
  for (const part of parts) {
    if (current.type !== 'dir') return;
    current = current.children[part];
    if (!current) return;
  }
  return current;
};

const getParent = (root: FSNode, path: string): { parent?: FSNode; name: string } => {
  const parts = path.split('/').filter(Boolean);
  const name = parts.pop() ?? '';
  const parentPath = '/' + parts.join('/');
  return { parent: getNode(root, parentPath), name };
};

export const writeFile = (root: FSNode, path: string, content: string): boolean => {
  const { parent, name } = getParent(root, path);
  if (!parent || parent.type !== 'dir' || !name) return false;
  parent.children[name] = { type: 'file', content };
  return true;
};

export const makeDir = (root: FSNode, path: string): boolean => {
  const { parent, name } = getParent(root, path);
  if (!parent || parent.type !== 'dir' || !name) return false;
  parent.children[name] = { type: 'dir', children: {} };
  return true;
};

export const deleteNode = (root: FSNode, path: string): boolean => {
  const { parent, name } = getParent(root, path);
  if (!parent || parent.type !== 'dir' || !parent.children[name]) return false;
  delete parent.children[name];
  return true;
};
