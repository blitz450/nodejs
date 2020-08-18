# Contributing

When contributing to this repository, please follow the following instructions:

## One time Setup:

1. Fork this repo.

   - Click on the 'Fork' button of this main repo https://github.com/blitz450/nodejs

   - Ensure 'Team-NJ2' is set as the default branch

2. Cloning git repo.

   - Copy the forked repo's URL,  
     https://github.com/{your-githubHandle}/nodejs.git

   - Open your Terminal, enter following command to clone the repo:  
      `git clone {URL-you-copied}`

   These steps will clone your forked repo into your local. Optionally, use the following command to check your remote URLs:

   ```
   git remote -v
   ```
   
   **Expected output:**

   ```
   origin https://github.com/{your-githubHandle}/nodejs.git (fetch)
   origin https://github.com/{your-githubHandle}/nodejs.git (push)
   ```

3)  Set original repo URL as "upstream" remote.

    - Copy the main repo's git URL,  
      https://github.com/blitz450/nodejs.git
    - Open your Terminal, cd to the repo folder, enter following command to add an upstream remote:

      ```
      git remote add upstream https://github.com/blitz450/nodejs.git
      ```

      This step will add new remote URL named "upstream". This will be used to keep your forked repo updated with main repo. Optionally, use the following command to check your remote URLs:

      ```
    	git remote -v
      ```

    	**Expected output:**
      ```
    	origin  https://github.com/{your-githubHandle}/nodejs.git (fetch)
    	origin  https://github.com/{your-githubHandle}/nodejs.git (push)
    	upstream  https://github.com/blitz450/nodejs.git (fetch)
    	upstream  https://github.com/blitz450/nodejs.git (push)
      ```

This is the initital setup. Also use command `npm install` to get all packages in local.

## Issues and making a PR:

After the aforementioned setup, follow these steps everytime you are assigned an issue:

1.  Ensure your default branch 'Team-NJ2' is in sync with upstream's.

    ```
    git checkout Team-NJ2
    ```

    ```
    git pull upstream Team-NJ2
    ```

2.  Branch out to a new branch for the issue you will work on.  
    Branch name should follow the format: 'issue#' , where # is the issue number.

    To create a new branch and switch to it at the same time, you can run:
    ```
    git checkout -b issue#
    ```

3.  Install npm modules

    ```
    npm install
    ```

4.  Make required changes, and commit your work in this issue branch that you just created. Ensure your work with `git status` command.

5.  Push changes from your issue branch to your Github fork.

    ```
    git push origin issue#
    ```

6.  Make a PR from your forked repo on github.

    - Goto your forked repo on GH and ensure that your commits and a new 'issue#' branch has been pushed.
    - Make a PR to blitz450:Team-NJ2 from your-githibHandle:issue#

7.  Once your PR has been approved and merged, you can safely delete your 'issue#' branch locally using:
    ```
    git branch -d issue#
    ```
    And to delete branch in your GH fork repo use the web UI or use command:
    ```
    git push origin --delete issue#
    ```

Repeat this flow everytime you start working on new issue.

---

## Contributors

- [Saurabh Chauhan](https://github.com/blitz450)
- [Irshad Ansari](https://github.com/irshadjsr21)
