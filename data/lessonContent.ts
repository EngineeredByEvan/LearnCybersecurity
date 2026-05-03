export type LessonContent = {
  intro: string;
  workedExample: string;
  exercise: string;
  hints: string[];
  solution: string;
  resources: { title: string; url: string; type: 'docs' | 'video' | 'lab' }[];
};

export const lessonContent: Record<string, LessonContent> = {
  'l-linux-1': {
    intro: 'In Linux, `ls` shows directory contents. Defenders constantly list directories to inspect logs, configs, and scripts during triage. Start by learning to quickly identify where files are and whether you are in the right folder.',
    workedExample: 'Command: `ls /var/log`\nOutput usually includes files like `auth.log`, `syslog`, and app-specific logs.',
    exercise: 'Run `ls` in your current directory.',
    hints: ['Type `ls` then press Run.', 'If unsure, run `man ls` first.'],
    solution: 'Use: `ls`',
    resources: [
      { title: 'GNU Coreutils ls docs', url: 'https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html', type: 'docs' },
      { title: 'OverTheWire Bandit', url: 'https://overthewire.org/wargames/bandit/', type: 'lab' }
    ]
  },
  'l-linux-2': {
    intro: '`pwd` prints your current working directory. During incident response, path awareness prevents editing or deleting the wrong file and helps reproducibility in reports.',
    workedExample: 'Command: `pwd`\nPossible output: `/home/learner`',
    exercise: 'Run `pwd` to verify your current path.',
    hints: ['The command has three letters.', 'It stands for print working directory.'],
    solution: 'Use: `pwd`',
    resources: [
      { title: 'LinuxCommand pwd tutorial', url: 'http://linuxcommand.org/lc3_lts0010.php', type: 'docs' },
      { title: 'The Cyber Mentor Linux Basics', url: 'https://www.youtube.com/watch?v=VbEx7B_PTOE', type: 'video' }
    ]
  },
  'l-linux-3': {
    intro: '`cat` prints file contents. Reading files quickly is core to SOC operations when checking scripts, indicators, and log snippets.',
    workedExample: 'Command: `cat /etc/passwd`\nShows local user account entries.',
    exercise: 'Display the content of `notes.txt`.',
    hints: ['Use `cat` followed by file path.', 'Try `cat notes.txt` in /home/learner.'],
    solution: 'Use: `cat notes.txt`',
    resources: [
      { title: 'man7 cat', url: 'https://man7.org/linux/man-pages/man1/cat.1.html', type: 'docs' },
      { title: 'Linux Journey: Files', url: 'https://linuxjourney.com/', type: 'docs' }
    ]
  },
  'l-linux-4': {
    intro: 'Pipes (`|`) send output from one command into another. This is critical for log triage: extract only relevant events from large files.',
    workedExample: 'Command: `cat /var/log/auth.log | grep Accepted`\nShows successful login lines only.',
    exercise: 'Filter `auth.log` for entries containing `Accepted`.',
    hints: ['Start with `cat /var/log/auth.log`.', 'Pipe into `grep Accepted`.'],
    solution: 'Use: `cat /var/log/auth.log | grep Accepted`',
    resources: [
      { title: 'grep manual', url: 'https://www.gnu.org/software/grep/manual/grep.html', type: 'docs' },
      { title: 'MIT Missing Semester (Shell Tools)', url: 'https://missing.csail.mit.edu/2020/shell-tools/', type: 'video' }
    ]
  }
};
