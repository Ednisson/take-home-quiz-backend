# take-home-quiz-backend


# if you dont have nodejs on your local machine, go to
https://nodejs.org/en
# and click Install Node.js button

# 1. installation of relational database on your local machine (postgreSQL)

- go to this link - https://postgresql.org

- after clicking expect to redirect to this route >
![image](https://github.com/user-attachments/assets/0c93e799-dea4-4937-842b-263f78dd18c2)

- click the "Download ->" button

- after clicking the "Download ->" button expect to redirect to this route >
![image](https://github.com/user-attachments/assets/11d63aa7-1da9-48dd-8388-5c1c41adacfd)

- and click the Windows button and expect to redirect to this route >
![image](https://github.com/user-attachments/assets/16722f65-3159-4edd-af98-fa7236462478)

- after redirecting to that route under the "Interactive installer by EDB", click the "Download the installer" link and expect to redirect to this route > 
![image](https://github.com/user-attachments/assets/4696ce22-c62e-4162-ada9-c9b05f5fff84)

- choose the latest version of the postgreSQL which is 17.5 and click the download icon button under the Windows x86-64 and wait the downloaded file to finish

- when downloaded file finished, open the file and we are ready to set up. >
  ![image](https://github.com/user-attachments/assets/e6f07792-674b-4f41-bb84-78dcb7a40098)

- keep clicking next button until you see this image >
![image](https://github.com/user-attachments/assets/8473119a-2d11-49d9-8439-52580c8a91b8)

- type a password value "vergara123456"

- after that do not change the port value, click next button until you see this (installing all postgreSQL files) >
  ![image](https://github.com/user-attachments/assets/f5705926-65fa-4991-b080-c86b226b9919)

- wait until the installation of all postgreSQL files is done. once done, click finish button and you will see this image and just click cancel button > 
    ![image](https://github.com/user-attachments/assets/d105c12f-c358-4ad5-8035-a73671cc5d69)

- after all these steps above, open the pgAdmin application and expect to see this >
  ![image](https://github.com/user-attachments/assets/872ba62e-6b6d-4a98-b6dd-db370f19fa8a)

- click the server on the left side under the Object Explorer and it will required to type the password which is "vergara123456"

- and now the postgreSQL relational database on your machine has been set up


# 2. open cmd and choose the folder path you want to clone the repository and type this
git clone https://github.com/Ednisson/take-home-quiz-backend.git

# 3. navigate to the project folder path
cd take-home-quiz-backend

# 4. fetch and pull by typing these on cmd
- git fetch
- git pull origin main

# 5 install node modules folder 
npm install

# 6. if you want to run the unit test, just type this on cmd 
npm run test

# 7. finally you can run the backend application by typing this
npm run dev

# it should be running and working
 





