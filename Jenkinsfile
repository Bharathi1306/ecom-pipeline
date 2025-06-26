pipeline {
    agent any

    environment {
        IMAGE_NAME = "bharathi136/ecom-pipeline"
    }

    stages {
        stage('Docker Build and Push') {
            steps {
                script {
                    docker.image('docker:24.0.2').inside('--entrypoint="" -v /var/run/docker.sock:/var/run/docker.sock -e DOCKER_CONFIG=/tmp') {

                        withCredentials([
                            usernamePassword(
                                credentialsId: 'dockerhub',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASS'
                            )
                        ]) {

                            echo '🛠 Building Docker Image'
                            sh 'docker build -t $IMAGE_NAME .'

                            echo '🔐 Logging into Docker Hub'
                            sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'

                            echo '📤 Pushing Docker Image to Docker Hub'
                            sh 'docker push $IMAGE_NAME'
                        }
                    }
                }
            }
        }
    }
}
