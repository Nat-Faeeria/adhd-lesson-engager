# ADHD Lesson Engager

A simple Vue app project to create interactive lessons/exercises to keep adhd (and other !)
 students engaged

Each finished part or task is rewarded by random confettis and a progress bar show where the 
student is in the lesson

Lessons can be created in Markdown. Any markdown is seen as content, and blocks delimited by "Questions:" and a new paragraph are considered tasks. Tasks must be a numbered list.

A Markdown file can be dropped in the upload space, and a formatted json file will be created. Dropping this file back in the upload space created the lesson.