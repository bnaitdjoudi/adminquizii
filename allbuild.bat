ECHO run 'npm run build' for building an optimized production code.
npm run build
@ECHO OFF
ECHO docker build for build docker image nginx image.
docker build  -t bnaitdjoudi/my-react-app:latest .
ECHO 'image created'.
PAUSE