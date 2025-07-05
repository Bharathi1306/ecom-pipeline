pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "bharathi136/ecom-app:latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"  // ✅ corrected
    }

    stages {
        stage('Clone') {
            steps {
                git url: 'https://github.com/Bharathi1306/ecom-pipeline.git', branch: 'master'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh '''
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                '''
            }
        }
    }
}
