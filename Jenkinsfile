pipeline {
    agent any
    environment {
        IMAGE_NAME = 'bharathi136/ecom-pipeline'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: '9096215a-5450-440f-ba8e-ab67e9b96b3a', url: 'https://github.com/Bharathi1306/ecom-pipeline.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo '🛠 Building Docker Image'
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                echo '📦 Pushing to Docker Hub'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME
                    '''
                }
            }
        }
    }
}
