FROM livekit/livekit-server:latest

COPY ./livekit.yaml /livekit.yaml

ARG LIVEKIT_IP
ARG LIVEKIT_REDIS_ADDRESS
ARG LIVEKIT_API_KEY
ARG LIVEKIT_API_SECRET

RUN sed -i "s/0.0.0.0/$LIVEKIT_IP/g" /livekit.yaml
RUN sed -i "s/livekitredisaddress/$LIVEKIT_REDIS_ADDRESS/g" /livekit.yaml
RUN sed -i "s/apikey/$LIVEKIT_API_KEY/g" /livekit.yaml
RUN sed -i "s/apisecret/$LIVEKIT_API_SECRET/g" /livekit.yaml

CMD ["--config", "/livekit.yaml"]
