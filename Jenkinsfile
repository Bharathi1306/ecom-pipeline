pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'bharathi136'
    IMAGE_NAME = 'ecom-pipeline'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/Bharathi1306/ecom-pipeline.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_HUB_USER/$IMAGE_NAME:latest .'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
          sh 'docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest'
        }
      }
    }
  }
}

