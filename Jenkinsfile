pipeline {
    agent any

    environment {
        IMAGE_NAME = "bharathi136/ecom-pipeline"
        DOCKER_HUB_USERNAME = credentials('dockerhub').username
        DOCKER_HUB_PASSWORD = credentials('dockerhub').password
    }

    stages {
        stage('Docker Build and Push') {
            steps {
                script {
                    docker.image('docker:24.0.2').inside('-v /var/run/docker.sock:/var/run/docker.sock') {
                        echo '🛠 Building Docker Image'
                        sh 'docker build -t $IMAGE_NAME .'

                        echo '🔐 Logging into Docker Hub'
                        sh 'echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin'

                        echo '📤 Pushing Docker Image'
                        sh 'docker push $IMAGE_NAME'
                    }
                }
            }
        }
    }
}
