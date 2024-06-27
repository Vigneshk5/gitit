import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
const questions = [
  {
    question: "What command is used to initialize a new Git repository?",
    answer: "git init",
    hint: "This command initializes an empty Git repository.",
  },
  {
    question: "Which command is used to check the status of the repository?",
    answer: "git status",
    hint: "This command shows the current status of the repository.",
  },
  {
    question: "How do you stage changes for commit?",
    answer: "git add",
    hint: "Use this command to stage changes for the next commit.",
  },
  {
    question: "What command is used to commit changes?",
    answer: "git commit",
    hint: "This command records the changes to the repository.",
  },
  {
    question: "How do you view the commit history?",
    answer: "git log",
    hint: "Use this command to view the commit history.",
  },
  {
    question: "What command is used to create a new branch?",
    answer: "git branch",
    hint: "This command creates a new branch.",
  },
  {
    question: "How do you switch to another branch?",
    answer: "git checkout",
    hint: "Use this command to switch to another branch.",
  },
  {
    question: "What command is used to merge branches?",
    answer: "git merge",
    hint: "This command merges one branch into another.",
  },
  {
    question: "How do you discard changes in the working directory?",
    answer: "git reset",
    hint: "Use this command to reset changes in the working directory.",
  },
  // {
  //   question: "Which command is used to clone a repository?",
  //   answer: "git clone",
  //   hint: "Use this command to clone a remote repository.",
  // },
  // {
  //   question:
  //     "What command is used to show the difference between the working directory and the index?",
  //   answer: "git diff",
  //   hint: "This command shows the difference between the working directory and the index.",
  // },
  // {
  //   question: "How do you rename a file in Git?",
  //   answer: "git mv",
  //   hint: "Use this command to rename a file in Git.",
  // },
  // {
  //   question:
  //     "What command is used to delete a file from the working directory and stage the deletion for commit?",
  //   answer: "git rm",
  //   hint: "This command removes a file from the working directory and stages the deletion.",
  // },
  // {
  //   question: "How do you show the Git remote repositories?",
  //   answer: "git remote -v",
  //   hint: "Use this command to display the configured remote repositories.",
  // },
  // {
  //   question: "What command is used to add a remote repository?",
  //   answer: "git remote add",
  //   hint: "This command adds a new remote repository.",
  // },
  // {
  //   question: "How do you fetch changes from a remote repository?",
  //   answer: "git fetch",
  //   hint: "Use this command to fetch changes from a remote repository.",
  // },
  // {
  //   question: "What command is used to push commits to a remote repository?",
  //   answer: "git push",
  //   hint: "This command sends local commits to the remote repository.",
  // },
  // {
  //   question: "How do you pull changes from a remote repository?",
  //   answer: "git pull",
  //   hint: "Use this command to fetch and integrate changes from a remote repository.",
  // },
  // {
  //   question: "What command is used to see the details of a specific commit?",
  //   answer: "git show",
  //   hint: "This command displays the details and changes of a specific commit.",
  // },
  // {
  //   question: "How do you create and switch to a new branch in one command?",
  //   answer: "git checkout -b",
  //   hint: "This command creates and switches to a new branch.",
  // },
  // {
  //   question: "What command is used to remove a branch?",
  //   answer: "git branch -d",
  //   hint: "Use this command to delete a branch.",
  // },
  // {
  //   question: "How do you rename a branch in Git?",
  //   answer: "git branch -m",
  //   hint: "This command renames the current branch.",
  // },
  // {
  //   question: "What command is used to rebase a branch onto another branch?",
  //   answer: "git rebase",
  //   hint: "Use this command to reapply commits on top of another base.",
  // },
  // {
  //   question: "How do you resolve merge conflicts in Git?",
  //   answer: "git merge --abort",
  //   hint: "This command aborts the merge process and restores the state before the merge.",
  // },
  // {
  //   question: "What command is used to stash changes in Git?",
  //   answer: "git stash",
  //   hint: "Use this command to temporarily store changes.",
  // },
  // {
  //   question: "How do you apply stashed changes in Git?",
  //   answer: "git stash apply",
  //   hint: "Use this command to apply the most recent stash.",
  // },
  // {
  //   question: "What command is used to view the stash list?",
  //   answer: "git stash list",
  //   hint: "This command lists all stashed changes.",
  // },
  // {
  //   question: "How do you drop a stash in Git?",
  //   answer: "git stash drop",
  //   hint: "Use this command to remove a stash.",
  // },
  // {
  //   question: "What command is used to create an empty commit in Git?",
  //   answer: "git commit --allow-empty",
  //   hint: "This command creates a commit without any changes.",
  // },
  // {
  //   question: "How do you amend the last commit message in Git?",
  //   answer: "git commit --amend",
  //   hint: "Use this command to edit the last commit message.",
  // },
  // {
  //   question: "What command is used to show the configuration settings?",
  //   answer: "git config --list",
  //   hint: "This command displays all Git configuration settings.",
  // },
  // {
  //   question: "How do you set your identity name and email in Git?",
  //   answer:
  //     'git config --global user.name "Your Name" && git config --global user.email "your.email@example.com"',
  //   hint: "Use these commands to set your identity globally.",
  // },
  // {
  //   question: "What command is used to show the commit logs with a specific format?",
  //   answer: 'git log --pretty=format:"%h - %an, %ar : %s"',
  //   hint: "This command customizes the format of commit logs.",
  // },
];

function App() {
  const [username, setUsername] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentTab, setCurrentTab] = useState("quiz");
  const certificateRef = useRef(null);

  const handleSubmitName = (event) => {
    event.preventDefault();
    if (username.trim() !== "") {
      setNameSubmitted(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentAnswer = questions[currentQuestion].answer.toLowerCase();
    const trimmedInput = inputValue.trim().toLowerCase();

    if (trimmedInput === currentAnswer) {
      setScore(score + 1);
      setAnsweredQuestions([
        ...answeredQuestions,
        { question: questions[currentQuestion].question, answer: currentAnswer },
      ]);
      setShowHint(false); // Reset hint display
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setInputValue("");
      } else {
        setShowResult(true);
      }
    } else {
      setShowHint(true);
    }
  };

  const handleHintClose = () => {
    setShowHint(false);
  };

  const calculatePercentage = () => {
    return ((score / questions.length) * 100).toFixed(2);
  };

  const handleDownloadCertificate = async () => {
    const canvas = await html2canvas(certificateRef.current);
    const link = document.createElement("a");
    link.download = `certificate_${username}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const certificateDetails = {
    id: `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    issueDate: new Date().toLocaleDateString(),
  };

  const shareUrl = window.location.href;

  const resources = [
    { title: "Pro Git Book", url: "https://git-scm.com/book/en/v2" },
    { title: "GitHub Learning Lab", url: "https://lab.github.com/" },
    { title: "Atlassian Git Tutorial", url: "https://www.atlassian.com/git/tutorials" },
    { title: "Git Documentation", url: "https://git-scm.com/doc" },
    {
      title: "Codecademy Git Course",
      url: "https://www.codecademy.com/learn/learn-git",
    },
    {
      title: "GitKraken Git Tutorials",
      url: "https://www.gitkraken.com/learn/git/tutorials",
    },
    {
      title: "Udacity Git Course",
      url: "https://www.udacity.com/course/version-control-with-git--ud123",
    },
    { title: "Git Immersion", url: "http://gitimmersion.com/" },
    {
      title: "The GitHub Training Team",
      url: "https://services.github.com/on-demand/",
    },
    { title: "Learn Git Branching", url: "https://learngitbranching.js.org/" },
  ];

  return (
    <div className="min-h-screen text-[#d4d4d4] flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="w-[1000px] rounded-lg border border-[#2b2b2b] shadow-lg flex flex-col">
        <div className="flex items-center justify-between bg-[#2b2b2b] px-4 py-2 rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-sm font-medium">Terminal</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTab("quiz")}
              className={`w-20 h-5 rounded-full ${
                currentTab === "quiz" ? "bg-[#3c3c3c]" : "hover:bg-[#3c3c3c]"
              }`}
            >
              Quiz
            </button>
            <button
              onClick={() => setCurrentTab("resources")}
              className={`w-20 h-5 rounded-full ${
                currentTab === "resources" ? "bg-[#3c3c3c]" : "hover:bg-[#3c3c3c]"
              }`}
            >
              Resources
            </button>
          </div>
        </div>
        <div className="overflow-auto bg-[#1e1e1e]">
          <div className="p-4">
            {currentTab === "quiz" ? (
              !nameSubmitted ? (
                <form onSubmit={handleSubmitName} className="space-y-4">
                  <p className="text-[#d4d4d4]">$ Enter your name:</p>
                  <div className="flex items-center">
                    <span className="text-[#6a9955]">$</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="ml-2 bg-transparent outline-none text-[#d4d4d4] placeholder-[#d4d4d4] w-full"
                      placeholder="Your name..."
                    />
                  </div>
                  <button
                    type="submit"
                    // className="bg-[#007acc] hover:bg-[#005f9e] px-4 py-2 rounded-md text-white focus:outline-none"
                  ></button>
                </form>
              ) : !showResult ? (
                <div className="overflow-y-auto max-h-96">
                  <div className="space-y-4">
                    {answeredQuestions.map((answered, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-[#d4d4d4] mb-1">$ {answered.question}</p>
                        <p className="text-[#6a9955] mb-1">
                          $ Answer: {answered.answer}
                        </p>
                      </div>
                    ))}
                    <p className="text-[#d4d4d4]">
                      {questions[currentQuestion].question}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex items-center">
                        <span className="text-[#6a9955]">$</span>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="ml-2 bg-transparent outline-none text-[#d4d4d4] placeholder-[#d4d4d4] w-full"
                          placeholder="Enter your answer..."
                        />
                      </div>
                      <button
                        type="submit"
                        // className="bg-[#007acc] hover:bg-[#005f9e] px-4 py-2 rounded-md text-white focus:outline-none"
                      ></button>
                      {showHint && (
                        <div className="p-3 bg-[#f4bf75] rounded-lg mt-4">
                          <p className="text-sm text-black">
                            {questions[currentQuestion].hint}
                          </p>
                          <button
                            className="mt-2 bg-[#2b2b2b] hover:bg-[#3c3c3c] px-3 py-1 rounded-md text-white text-sm focus:outline-none"
                            onClick={handleHintClose}
                          >
                            Close Hint
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-4">Quiz Complete!</h2>
                  <p className="text-lg">
                    Your score: {score} / {questions.length}
                  </p>
                  <p className="text-lg">Percentage: {calculatePercentage()}%</p>
                  <div
                    ref={certificateRef}
                    className="mt-4 p-3 bg-[#2b2b2b] rounded-lg"
                  >
                    <p className="text-lg font-bold">Certificate of Completion</p>
                    <p className="text-sm mt-2">Awarded to {username}</p>
                    <p className="text-sm mt-2">
                      For achieving a score of {calculatePercentage()}%
                    </p>
                    <p className="text-sm mt-2">
                      Certificate ID: {certificateDetails.id}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Issued on {certificateDetails.issueDate}
                    </p>
                    <p className="text-sm mt-2">Congratulations on your achievement!</p>
                  </div>
                  <button
                    onClick={handleDownloadCertificate}
                    className="bg-[#007acc] hover:bg-[#005f9e] px-4 py-2 rounded-md text-white focus:outline-none mt-4"
                  >
                    Download Certificate
                  </button>
                  <div className="mt-4">
                    <FacebookShareButton
                      url={shareUrl}
                      quote={`I scored ${calculatePercentage()}% on the Git quiz!`}
                    >
                      <button className="bg-[#4267b2] hover:bg-[#365899] px-4 py-2 rounded-md text-white focus:outline-none mr-2">
                        Share on Facebook
                      </button>
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={shareUrl}
                      title={`I scored ${calculatePercentage()}% on the Git quiz!`}
                    >
                      <button className="bg-[#1da1f2] hover:bg-[#1991da] px-4 py-2 rounded-md text-white focus:outline-none mr-2">
                        Share on Twitter
                      </button>
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={shareUrl}
                      summary={`I scored ${calculatePercentage()}% on the Git quiz!`}
                    >
                      <button className="bg-[#0077b5] hover:bg-[#005582] px-4 py-2 rounded-md text-white focus:outline-none">
                        Share on LinkedIn
                      </button>
                    </LinkedinShareButton>
                  </div>
                </div>
              )
            ) : (
              <div className="overflow-y-auto max-h-96">
                <h2 className="text-xl font-bold mb-4">Resources to Learn Git</h2>
                <ul className="space-y-2">
                  {resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#007acc] hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
